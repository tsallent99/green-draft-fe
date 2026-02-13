import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginUserDataT, LoginResponseT } from '../../../domain/repositories';
import { useUserRepositoryFactory } from '../../dependency-injection/useUserRepositoryFactory';
import { UserEntity } from '../../../domain/entities';

type LoginResponseWithEntity = {
  accessToken: string;
  tokenType: string;
  user: UserEntity;
};

type UseLoginUserOptions = {
  config?: Omit<
    UseMutationOptions<LoginResponseWithEntity, Error, LoginUserDataT>,
    'mutationFn'
  >;
};

export function useLoginUser({ config = {} }: UseLoginUserOptions = {}) {
  const repository = useUserRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    LoginResponseWithEntity,
    Error,
    LoginUserDataT
  >({
    ...config,
    mutationFn: async (data: LoginUserDataT) => {
      const response = await repository.login(data);
      return {
        accessToken: response.accessToken,
        tokenType: response.tokenType,
        user: new UserEntity(response.user),
      };
    },
  });

  return {
    login: mutate,
    loginAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
