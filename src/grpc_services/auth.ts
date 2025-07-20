import { create } from '@bufbuild/protobuf';
import {
  Platform,
  AuthService as AuthClient,
  Client,
  AuthMethod,
  DeviceType,
  SigninRequestSchema,
  RegisteringDeviceSchema,
  SignupRequestSchema
} from 'schema-ts';

import { generateUUIDv4 } from '@/utils/uuid';

export enum App {
  BitBridge = 'BitBridge',
}

export function getAppName(str: string) {
  if (str.toLowerCase().includes('bitbridge')) {
    return App.BitBridge;
  }

  throw new Error('Invalid app name');
}

export default class AuthService extends Client.Base<typeof AuthClient> {
  constructor() {
    super(AuthClient);
  }

  public async signinWithGoogle(app: App, currentUrl: string) {
    const request = create(SigninRequestSchema, {
      method: AuthMethod.GOOGLE,
      appName: app,
      originalWebPageUrl: currentUrl,
      device: create(RegisteringDeviceSchema, {
        deviceName: navigator.userAgent,
        deviceType: DeviceType.OtherLaptop,
        platform: Platform.Web,
        deviceUniqueKey: generateUUIDv4(),
      }),
    });

    const response = await this.client.signin(request);
    return response.signinUrl;
  }

  public async signupWithGoogle(app: App, currentUrl: string) {
    const request = create(SignupRequestSchema, {
      method: AuthMethod.GOOGLE,
      appName: app,
      originalWebPageUrl: currentUrl,
      device: create(RegisteringDeviceSchema, {
        deviceName: navigator.userAgent,
        deviceType: DeviceType.OtherLaptop,
        platform: Platform.Web,
        deviceUniqueKey: generateUUIDv4(),
      }),
    });

    const response = await this.client.signup(request);
    return response.signupUrl;
  }
}
