import { usePromise } from '@/hooks/use-promise';
import AuthService from '@/grpc_services/auth';

const authService = new AuthService();

export default function useService() {
  return {
    auth: {
      signinWithGoogle: usePromise(authService.signinWithGoogle.bind(authService), ['app', 'currentUrl'])
    }
  }
}