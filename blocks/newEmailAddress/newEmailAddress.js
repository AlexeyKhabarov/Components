import {Block} from '../block';
import template from './newEmailAddress.pug';

export class NewEmailAddress extends Block {
    template (data) {
        return template(data);
    }
}   
