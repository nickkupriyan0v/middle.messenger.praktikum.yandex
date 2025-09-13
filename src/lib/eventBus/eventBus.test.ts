import { describe, it, expect, vi, beforeEach } from 'vitest';
import EventBus from '.';

describe('EventBus', () => {
  let eventBus: EventBus;
  const mockCallback = vi.fn();
  const anotherMockCallback = vi.fn();

  beforeEach(() => {
    eventBus = new EventBus();
    mockCallback.mockClear();
    anotherMockCallback.mockClear();
  });

  it('создает экземпляр EventBus', () => {
    expect(eventBus).toBeInstanceOf(EventBus);
  });

  it('подписывает callback на событие', () => {
    eventBus.on('test', mockCallback);
    
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('вызывает callback при эмите события', () => {
    eventBus.on('test', mockCallback);
    eventBus.emit('test');
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('передает аргументы в callback при эмите', () => {
    const testData = { message: 'Hello' };
    
    eventBus.on('test', mockCallback);
    eventBus.emit('test', testData);
    
    expect(mockCallback).toHaveBeenCalledWith(testData);
  });

  it('поддерживает несколько callback на одно событие', () => {
    eventBus.on('test', mockCallback);
    eventBus.on('test', anotherMockCallback);
    eventBus.emit('test');
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(anotherMockCallback).toHaveBeenCalledTimes(1);
  });

  it('отписывает callback от события', () => {
    eventBus.on('test', mockCallback);
    eventBus.off('test', mockCallback);
    eventBus.emit('test');
    
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('выбрасывает ошибку при отписке от несуществующего события', () => {
    expect(() => {
      eventBus.off('nonexistent', mockCallback);
    }).toThrow('Нет события: nonexistent');
  });

  it('выбрасывает ошибку при эмите несуществующего события', () => {
    expect(() => {
      eventBus.emit('nonexistent');
    }).toThrow('Нет события: nonexistent');
  });

  it('поддерживает несколько аргументов', () => {
    eventBus.on('test', mockCallback);
    eventBus.emit('test', 'arg1', 'arg2', 3);
    
    expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2', 3);
  });
});
