import { Block } from '../block';
import { Textbox } from '../textbox/textbox'
import template from './email-helper.pug';

/* eslint-disable */
import _ from './email-helper.scss';
/* eslint-enable */

export class EmailHelper extends Block {
  get bemName () {
    return 'email-helper';
  }
  template (data) {
    return template(data);
  }
  constructor (options) {
    super(options);
    this.email = new Textbox({
      name: 'email',
      label: 'Введите email',
      value: '',
      placeholder: 'alexey.khabarov@mail.ru',
      required: false
    });

    this.helper = document.createElement('div');
    this.helper.style.position = 'absolute';
    this.helper.classList.add(`${this.bemName}__email__list`);
    this.helper.classList.toggle(`${this.bemName}_active`, false);
    // console.log(document.querySelector('.email-helper__email'));
    // document.querySelectorAll('.email-helper__email').appendChild(this.helper);

    this.onShowList = this.onShowList.bind(this);
    this.onHideList = this.onHideList.bind(this);
  }

  delegate (eventName, element, cssSelector, callback) {
    let fn = event => {
      if (!event.target.matches(cssSelector)) {
        return;
      }
      callback(event);
    };

    element.addEventListener(eventName, fn);

    return this;
  }

  onShowList (event) {
    event.preventDefault();
    this.helper.innerHTML = 'Привет';
    this.helper.classList.toggle(`${this.bemName}_active`, true);

    let spanRect = event.target.getBoundingClientRect();
    let elRect = this.helper.getBoundingClientRect();

    this.helper.style.left = `${spanRect.left}px`

    let top = spanRect.bottom + 5;
    if (top + elRect.height > document.documentElement.clientHeight) {
      top = spanRect.top - elRect.height - 5;
    }
    console.log('call onShowList');

    this.helper.style.top = `${top}px`;
  }
  onHideList () {
    this.helper.classList.toggle(`${this.bemName}_active`, false);
    console.log('call onHideList');
  }

  render (el) {
    super.render(el);
    this.email.render(this.getElement('email'));
    console.log('render');
    document.querySelector('.email-helper__email').appendChild(this.helper);
    // this.el.querySelector('form').addEventListener('click', event => {
    //   event.preventDefault();
    //   console.log(this.email);
    // })
    // this.delegate('click', this.email, '[data-tooltip]', this.onShowList);
    // this.delegate('click', document.body, '[data-tooltip]', this.onHideList);
    console.log(this.email);
    // this.email.addEventListener('click', this.onShowList);
    // document.body.addEventListener('click', this.onHideList);
    document.body.querySelectorAll('.textbox__input').forEach((elem) => {
      elem.addEventListener('click', this.onShowList);
    });
  }
}
