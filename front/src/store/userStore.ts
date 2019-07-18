import { observable, action, runInAction, computed } from 'mobx'

import { ApiClient } from '&front/api/ApiClient'
import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { Token } from '&shared/model/Token'
import { ApplicationStore } from './ApplicationStore'
import { RouteName } from '&front/router/RouteName'
import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'

const TOKEN_LOCALSTORAGE_KEY = 'access-token'

export class UserStore {
  @observable
  token: string | null = null

  constructor(private readonly store: ApplicationStore) {
    this.token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
  }

  @computed
  get api() {
    return new ApiClient(this.token)
  }

  @action
  async telegramSignIn(telegramPayload: TelegramAuthPayload) {
    const token = await this.api.post<Token>('/user/auth/telegram')(
      telegramPayload,
    )

    this.saveToken(token)

    this.store.routerStore.navigate(RouteName.Hello)
  }

  async internalSignIn(credentials: LoginPasswordCredentials) {
    const token = await this.api.post<Token>('/user/auth/login')(credentials)

    this.saveToken(token)

    this.store.routerStore.navigate(RouteName.Hello)
  }

  @action
  private saveToken = ({ token }: Token) => {
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token)

    runInAction(() => {
      this.token = token
    })
  }
}
