import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SubscribeFormComponent } from './subscribe-form.component';
import { initialData } from './subscription';

describe('SubscribeFormComponent', () => {

  let component: SubscribeFormComponent;

  beforeEach(() => {
    component = new SubscribeFormComponent();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with initial data', () => {
    expect(component.subscribeModel()).toEqual(initialData);
  });

  it('should update email in signal model', () => {

    component.subscribeModel.update(data => ({
      ...data,
      email: 'test@gmail.com'
    }));

    expect(component.subscribeModel().email).toBe('test@gmail.com');
  });

  it('should trigger effect when email changes', () => {

    const spy = vi.spyOn(console, 'log');

    component.subscribeModel.update(data => ({
      ...data,
      email: 'new@test.com'
    }));

    expect(spy).toHaveBeenCalled();
  });

});