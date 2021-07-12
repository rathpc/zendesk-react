import { fireEvent, render } from '@testing-library/react';

import { Zendesk, zendeskApi } from './index';

let consoleLogOutput: Console['log'][] = [];
let consoleWarnOutput: Console['warn'][] = [];

const consoleLog = console.log;
const consoleWarn = console.warn;
const zendeskKey = 'some-zendesk-key-value';
const zE = window.zE;
const zEInit = window.zEInit;
const zESettings = window.zESettings;

const mockedConsoleLog = (output: Console['log']) => consoleLogOutput.push(output);
const mockedConsoleWarn = (output: Console['warn']) => consoleWarnOutput.push(output);

describe('index.ts', () => {
  beforeAll(() => {
    global.window = Object.create(window);
  });

  beforeEach(() => {
    console.warn = mockedConsoleWarn;
    console.log = mockedConsoleLog;
  });

  afterEach(() => {
    console.log = consoleLog;
    consoleLogOutput = [];
    console.warn = consoleWarn;
    consoleWarnOutput = [];

    window.zE = zE;
    window.zEInit = zEInit;
    window.zESettings = zESettings;
  });

  describe('zendeskApi', () => {
    it('calls zendeskApi before it has been initialized', () => {
      zendeskApi('something');
      expect(consoleWarnOutput[0]).toBe('Zendesk has not been initialized yet!');
    });

    it('calls zendeskApi after it has been initialized and window.zE is defined', () => {
      window.zE = jest.fn();
      window.zE.apply = jest.fn();
      zendeskApi('something');
      expect(window.zE.apply).toBeCalledWith(null, ['something']);
    });
  });

  describe('Zendesk', () => {
    it('returns null and uses defer', () => {
      const { container } = render(<Zendesk defer zendeskKey={zendeskKey} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('uses default zESettings', () => {
      render(<Zendesk zendeskKey={zendeskKey} />);
      expect(window.zESettings).toStrictEqual({});
    });

    it('uses zESettings passed into component', () => {
      const zESettings = { position: { horizontal: 'left', vertical: 'bottom' } };
      render(<Zendesk zendeskKey={zendeskKey} zendeskSettings={zESettings} />);
      expect(window.zESettings).toStrictEqual(zESettings);
    });

    it('returns early when disabled is set to true', () => {
      const { container } = render(<Zendesk zendeskKey={zendeskKey} disabled />);
      expect(container).toBeEmptyDOMElement();
    });

    it('cleans up window object on unmount', () => {
      window.zE = jest.fn();
      window.zEInit = jest.fn();
      window.zESettings = {};
      const { unmount } = render(<Zendesk zendeskKey={zendeskKey} />);
      unmount();
      expect(window.zE).toBeUndefined();
      expect(window.zEInit).toBeUndefined();
      expect(window.zESettings).toBeUndefined();
    });

    it('does not call window.zEInit if initCallback is not passed', () => {
      render(<Zendesk zendeskKey={zendeskKey} />);
      const script = document.body.querySelector('script');
      script && fireEvent.load(script);
      expect(window.zEInit).toBeUndefined();
    });

    it('calls initCallback if it is passed and logs to console', () => {
      const initCallback = jest.fn(() => console.log('Zendesk has been loaded!'));
      render(<Zendesk zendeskKey={zendeskKey} initCallback={initCallback} />);
      const script = document.body.querySelector('script');
      script && fireEvent.load(script);
      expect(window.zEInit).not.toBeUndefined();
      expect(initCallback).toBeCalled();
      expect(consoleLogOutput[0]).toBe('Zendesk has been loaded!');
    });
  });
});
