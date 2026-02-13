import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UserEntity } from '../../../domain/entities';
import { RegisterUserDataT } from '../../../domain/repositories';
import { useUserRepositoryFactory } from '../../dependency-injection/useUserRepositoryFactory';

type UseRegisterUserOptions = {
  config?: Omit<
    UseMutationOptions<UserEntity, Error, RegisterUserDataT>,
    'mutationFn'
  >;
};

export function useRegisterUser({ config = {} }: UseRegisterUserOptions = {}) {
  const repository = useUserRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    UserEntity,
    Error,
    RegisterUserDataT
  >({
    ...config,
    mutationFn: async (data: RegisterUserDataT) => {
      const userData = await repository.register(data);
      return new UserEntity(userData);
    },
  });

  return {
    register: mutate,
    registerAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
