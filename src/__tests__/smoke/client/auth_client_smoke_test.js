const axiosMock = require('axios')
const {mockAuthInfo, mountRequestUrlWithAccessToken} = require('../helper')
const {Sdk__NAME__Facade} = require('../../../client')

const sdkClient = new Sdk__NAME__Facade(mockAuthInfo)

describe("StoreClientSmokeTest", () => {
    describe("authenticate", () => {
        it("endpoint call", async (done) => {
            const info = {
                consumer_key: 'a',
                consumer_secret: 'a',
                code: 'a',
            }

            await sdkClient.auth.authenticate(info)

            expect(axiosMock.post).toHaveBeenCalledWith(
                mountRequestUrlWithAccessToken(`/auth/`),
                info,
            )

            done()
        })
    })

    describe("updateToken", () => {
        it("endpoint call", async (done) => {
            const refreshToken = "abc123"

            await sdkClient.auth.updateToken(refreshToken)

            expect(axiosMock.get).toHaveBeenCalledWith(
                mountRequestUrlWithAccessToken(`/auth/`, {key: 'refresh_token', value: refreshToken}),
            )

            done()
        })
    })
})
