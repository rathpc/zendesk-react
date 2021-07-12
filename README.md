# zendesk-react

> A minimal component based implementation to include Zendesk in your React application

## Introduction

This component allows you to integrate the Zendesk Web Widget easily into an existing React application by the use of a
component. For official Zendesk information on how to configure the widget and use the api, please refer to the
[Zendesk official documentation](https://developer.zendesk.com/embeddables/docs/widget/introduction).

<br />

## Installation

```sh
npm i @rathpc/zendesk-react --save
```

or

```sh
yarn add @rathpc/zendesk-react
```

<br />

## Usage

### Component usage

```tsx
...

import { Zendesk } from '@rathpc/zendesk-react';

...

const zendeskKey = 'your-unique-zendesk-key';

// Settings to pass into the component - we are positioning the widget and hiding the contact form
const zendeskSettings = {
  contactForm: {
    suppress: true,
  },
  position: {
    horizontal: 'left',
    vertical: 'bottom',
  },
};

export const SomeOtherComponent: React.FC = () => {
  // Optionally perform some actions after the Zendesk script has been loaded
  const initCallback = () => {
    console.log('Script loaded and ready!');
  };

  return (
    <div>
      ...
      <Zendesk zendeskKey={zendeskKey} zendeskSettings={zendeskSettings} initCallback={initCallback} defer />
      ...
    </div>
  );
};
```

#### Component Attributes

|Attribute       |Required (*) |Type                    |Default Value |Description                                                                                                                         |
|:---------------|:-----------:|:-----------------------|:-------------|:-----------------------------------------------------------------------------------------------------------------------------------|
|defer           |             |boolean                 |undefined     |Set this to true if you want the script tag to use defer instead of async                                                           |
|disabled        |             |boolean                 |undefined     |Set this to true if you do not want the component to add the script to the document. This may be useful in development environments |
|initCallback    |             |() => void              |undefined     |Define a function to be called upon a successful loading of the Zendesk script                                                      |
|zendeskKey      |*            |string                  |              |The unique key you are provided from Zendesk                                                                                        |
|zendeskSettings |             |Record<string, unknown> |undefined     |An object to pass to the Zendesk widget instance on initialization for configuration of the widget                                  |

<br />

### API usage

```ts
import { zendeskAPI } from '@rathpc/zendesk-react';

// Programatically hide the widget
zendeskApi('webWidget', 'hide')

```

<br />

## License

MIT

<br />
<br />
<br />

## Special Thanks

> Inspiration to make this library derived from <https://github.com/B3nnyL/react-zendesk>
