import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    greetMe(name: string): Promise<string>;
    getHello(): Promise<string>;
}
