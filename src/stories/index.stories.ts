import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import { Welcome, Button } from '@storybook/angular/demo';

import { AppComponent } from '../app/app.component';

import { SimpleKnobsComponent } from '../quick-stories/knobs.component';

const stories = storiesOf('Storybook Knobs', module);

stories.addDecorator(withKnobs);

storiesOf('Welcome', module).add('to Storybook', () => ({
  component: Welcome,
  props: {},
}));

storiesOf('AppComponent', module).add('Varaint 1', () => ({
  component: AppComponent,
  props: {},
}));

stories.add('Config a button', () => ({
  component: Button,
  props: {
   text: text('text', 'Hello Storybook'), // The first param of the knob function has to be exactly the same as the component input.
  },
}));

stories.add('Simple', () => {
    const name = text('name', 'John Doe');
    const age = number('age', 0);
    const phoneNumber = text('phoneNumber', '555-55-55');

    return {
      moduleMetadata: {
        entryComponents: [SimpleKnobsComponent],
        declarations: [SimpleKnobsComponent],
      },
      template: `
        <h1> This is a template </h1>
        <storybook-simple-knobs-component
          [age]="age"
          [phoneNumber]="phoneNumber"
          [name]="name"
        >
        </storybook-simple-knobs-component>
      `,
      props: {
        name,
        age,
        phoneNumber,
      },
    };
});

storiesOf('Button', module)
  .add('with text', () => ({
    component: Button,
    props: {
      text: 'Hello Button',
    },
  }))
  .add(
    'with some emoji',
    () => ({
      component: Button,
      props: {
        text: '😀 😎 👍 💯',
      },
    }),
    { notes: 'My notes on a button with emojis' }
  )
  .add(
    'with some emoji and action',
    () => ({
      component: Button,
      props: {
        text: '😀 😎 👍 💯',
        onClick: action('This was clicked OMG'),
      },
    }),
    { notes: 'My notes on a button with emojis' }
  );

storiesOf('Another Button', module).add('button with link to another story', () => ({
  component: Button,
  props: {
    text: 'Go to Welcome Story',
    onClick: linkTo('Welcome'),
  },
}));
