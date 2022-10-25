import { Interceptor } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import { Container } from 'aurelia-framework';
export declare class AuthenticationControl {
    router: Router;
    private container;
    active: boolean;
    notAuthenticated: () => void;
    notAuthenticatedRoute: string;
    onlyForAuthRoutes: boolean;
    constructor(router: Router, container: Container);
    responseInterceptor(): Interceptor;
    private debounceTimeout;
    private debounceLoginAgainMessage;
}
