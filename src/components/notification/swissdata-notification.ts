import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, bindable, Container } from 'aurelia-framework';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { SwissdataNotificationTheme } from './swissdata-notification-theme';

@inject(Element, StyleEngine, EventAggregator)
export class SwissdataNotification implements UxComponent {

  @bindable theme: SwissdataNotificationTheme;
  @bindable handlerId: string = 'main';
  @bindable catchAll: boolean = false;
  @bindable display: 'popup' | 'inline' = 'inline';

  public currentNotifications: Array<Notification> = [];

  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private eventAggregator: EventAggregator){
    this.eventAggregator.subscribe(Notification, (notification: Notification) => {
      if (notification.intercepted) return;
      if (notification.handlerDestination === this.handlerId) return this.interceptNow(notification);
      if (this.catchAll) return this.interceptLater(notification);
    });
  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public attached() {
    
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'swissdata-notification';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  interceptNow(notification: Notification) {
    if (notification.intercepted) return;
    notification.intercepted = true;
    if (notification.clearHandlerWhenIntercepted) {
      this.currentNotifications = [];
    }
    this.currentNotifications.push(notification);
    if (notification.lifetime > 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.lifetime);
    }
  }

  interceptLater(notification: Notification) {
    setTimeout(() => {
      this.interceptNow(notification);
    }, 100);
  }

  removeNotification(notification: Notification) {

    // copy array
    let tmpArray: Array<Notification> = [];
    for (let n of this.currentNotifications) tmpArray.push(n);
    // splice tmp array
    let index = tmpArray.indexOf(notification);
    if (index === -1) return;
    tmpArray.splice(index, 1);
    // copy tmp in current notif
    this.currentNotifications = tmpArray;
  }

  clickOnNotification(notification: Notification) {
    if (notification.hideOnClick) this.removeNotification(notification);
  }
}

export interface ErrorHandlerOptions {
  lifetime?: number,
  hideOnClick?: boolean;
  clearHandlerWhenIntercepted?: boolean;
  enableTranslation?: boolean;
}

export function notifier(handlerId: string = 'main', options?: ErrorHandlerOptions) {
  return (title: string, message: string, type: 'info' | 'confirmation' | 'error' | 'warning' = 'info') => {
    let i18n = Container.instance.get(I18N);
    let notification = new Notification(type, handlerId);
    if (!options || (options && options.enableTranslation !== false)) {
      title = i18n.tr(`${type}.${title}`)
      message = i18n.tr(`${type}.${message}`)
    }
    notification.title = title;
    notification.message = message;
    if (options && options.lifetime !== undefined) notification.lifetime = options.lifetime;
    if (options && options.hideOnClick !== undefined) notification.hideOnClick = options.hideOnClick;
    if (options && options.clearHandlerWhenIntercepted !== undefined) notification.clearHandlerWhenIntercepted = options.clearHandlerWhenIntercepted;
    let eventAggregator = Container.instance.get(EventAggregator);
    eventAggregator.publish(notification);
  }
}

export function errorHandler(handlerId: string = 'main', options?: ErrorHandlerOptions) {
  return (error: Error) => {
    let i18n = Container.instance.get(I18N);
    let notification = new Notification('error', handlerId);
    let message = error.message;
    if (!options || (options && options.enableTranslation !== false)) {
      message = i18n.tr(`error.${message}`)
    }
    notification.message = message;
    //notification.message = error.message;
    if (options && options.lifetime !== undefined) notification.lifetime = options.lifetime;
    if (options && options.hideOnClick !== undefined) notification.hideOnClick = options.hideOnClick;
    if (options && options.clearHandlerWhenIntercepted !== undefined) notification.clearHandlerWhenIntercepted = options.clearHandlerWhenIntercepted;
    let eventAggregator = Container.instance.get(EventAggregator);
    eventAggregator.publish(notification);
  };
}

export class Notification {
  public type: 'error' | 'warning' | 'info' | 'confirmation';
  public handlerDestination: string = 'main';
  public title: string;
  public message: string;
  public lifetime: number = 4 * 1000;
  public hideOnClick: boolean = true;
  public intercepted: boolean = false;
  public clearHandlerWhenIntercepted: boolean = false;

  constructor(type: 'error' | 'warning' | 'info' | 'confirmation', handlerDesination?: string) {
    this.type = type;
    if (handlerDesination) this.handlerDestination = handlerDesination;
  }
}
