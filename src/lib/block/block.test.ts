import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import EventBus from '../eventBus/index.ts';
import { BlockEvents } from './types.ts';
import Block from './index.ts';

vi.mock('../eventBus/index.ts');
vi.mock('uuid', () => ({
  v4: () => 'test-uuid-123'
}));
vi.mock('handlebars', () => {
  const mockCompile = vi.fn(() => vi.fn(() => '<div>Test Template</div>'));
  return {
    default: {
      compile: mockCompile
    }
  };
});

describe('Block', () => {
  let TestBlock: typeof Block;
  let mockEventBus: EventBus;

  beforeEach(() => {
    mockEventBus = {
      on: vi.fn(),
      emit: vi.fn(),
      off: vi.fn()
    } as unknown as EventBus;
    (EventBus as Mock).mockImplementation(() => mockEventBus);

    TestBlock = class TestBlock extends Block {
      render() {
        return this.compile('<div>Test Template</div>', {});
      }
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('создает экземпляр блока', () => {
    const block = new TestBlock();
    expect(block).toBeInstanceOf(Block);
    expect(EventBus).toHaveBeenCalled();
  });

  it('регистрирует события при создании', () => {
    new TestBlock();
    
    expect(mockEventBus.on).toHaveBeenCalledWith(BlockEvents.init, expect.any(Function));
    expect(mockEventBus.on).toHaveBeenCalledWith(BlockEvents.flowCdm, expect.any(Function));
    expect(mockEventBus.on).toHaveBeenCalledWith(BlockEvents.flowRender, expect.any(Function));
  });

  it('инициализирует элемент при вызове init', () => {
    const block = new TestBlock('div', { className: 'test-class' });
    
    block['init']();
    
    expect(block.getElement()).toBeInstanceOf(HTMLElement);
    expect(block.getElement()?.className).toBe('test-class');
  });

  it('обрабатывает children', () => {
    const childBlock = new TestBlock();
    const block = new TestBlock('div', { 
      child: childBlock,
      childrenList: [childBlock, childBlock]
    });
    
    expect(block.children.child).toBe(childBlock);
    expect(block.children.childrenList).toEqual([childBlock, childBlock]);
  });

  it('обновляет пропсы через прокси', () => {
    const block = new TestBlock('div', { text: 'initial' });
    block['init']();
    
    vi.spyOn(block, 'shouldComponentUpdate').mockReturnValue(true);
    vi.spyOn(block, 'componentDidUpdate').mockReturnValue(true);
    
    block.setProps({ text: 'updated' });
    
    expect(block['meta'].props.text).toBe('updated');
    expect(block.shouldComponentUpdate).toHaveBeenCalled();
    expect(block.componentDidUpdate).toHaveBeenCalled();
  });

  it('возвращает контент элемента', () => {
    const block = new TestBlock();
    block['init']();
    
    const content = block.getContent();
    expect(content).toBeInstanceOf(HTMLElement);
  });

  it('компилирует шаблон с детьми', () => {
    const childBlock = new TestBlock();
    const block = new TestBlock('div', { child: childBlock });
    block['init']();
    
    const fragment = block['compile']('<div>{{{child}}}</div>', {});
    expect(fragment).toBeInstanceOf(DocumentFragment);
  });

  it('не обновляет компонент если shouldComponentUpdate возвращает false', () => {
    const block = new TestBlock();
    block['init']();
    
    vi.spyOn(block, 'shouldComponentUpdate').mockReturnValue(false);
    vi.spyOn(block, 'componentDidUpdate');
    
    block.setProps({ test: 'value' });
    
    expect(block.componentDidUpdate).not.toHaveBeenCalled();
  });
});
