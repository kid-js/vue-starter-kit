<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import { useAuth, useForm } from '@/shared/composables'

import { PATH_DEFAULT } from '@/shared/constants'
import { FORMS } from '@/validation/types'

import type { TSchema } from '@/validation/types'

type TLoginSchema = TSchema<typeof FORMS.LOGIN>

const { login, isAuthLoading } = useAuth()

const { schema, state } = useForm(FORMS.LOGIN, {
  password: 'bateman!90KYA',
  email: 'bateman@dc.com',
})

const onSubmit = async (event: FormSubmitEvent<TLoginSchema>): Promise<void> => {
  await login(event.data)
}
</script>

<template>
  <NForm class="auth-form" :state :schema @submit="onSubmit">
    <NFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </NFormField>

    <NFormField label="Password" name="password">
      <UInputPassword v-model="state.password" />
    </NFormField>

    <UButton type="submit" label="Login" :loading="isAuthLoading" />

    <span class="auth-form__link">
      Or, <router-link :to="PATH_DEFAULT">go home</router-link>
    </span>
  </NForm>
</template>

<style lang="scss" scoped>
.auth-form {
  inline-size: min(100%, 400px);
  display: grid;
  gap: 20px;

  &__link {
    justify-self: right;
  }
}
</style>
