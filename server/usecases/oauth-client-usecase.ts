import { OauthClientRepository } from "../repositories/oauth-client-repository";

export class OauthClientUsecase {
    constructor(
        private oauthClientRepo: OauthClientRepository,
        private redirectUri: string
    ) {}

    public authorizationCode(code: string) {
        return this.oauthClientRepo.authorizationCode(
            code, 
            this.redirectUri,
        )
    }
}
