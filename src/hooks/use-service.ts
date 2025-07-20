import AuthService from '@/grpc_services/auth';
import { usePromise } from '@/hooks/use-promise';

const authService = new AuthService();

export default function useService() {
  return {
    auth: {
      signinWithGoogle: usePromise(
        authService.signinWithGoogle.bind(authService),
        ['app', 'currentUrl'],
      ),
      signupWithGoogle: usePromise(
        authService.signupWithGoogle.bind(authService),
        ['app', 'currentUrl'],
      ),
    },
  };
}
