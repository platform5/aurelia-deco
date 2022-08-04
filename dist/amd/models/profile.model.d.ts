import { Model, Metadata } from '../deco';
export declare class ProfileModel extends Model {
    userId?: string;
    picture: any;
    street: string;
    zip: string;
    city: string;
    country: string;
    company: string;
    department: string;
    metadata: Array<Metadata>;
}
