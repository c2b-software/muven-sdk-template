const mockAuthInfo = {
    token1: 'a1',
    token2: 'a2',
}

const mountRequestUrlWithAuthTokens = function(path, queryinfo) {
    if (!queryinfo) {
        return `${mockAuthInfo.api_host}${path}?token1=${mockAuthInfo.token1}&token2=${mockAuthInfo.token2}`
    }

    return `${mockAuthInfo.api_host}${path}?token1=${mockAuthInfo.token1}&token2=${mockAuthInfo.token2}&${queryinfo.key}=${queryinfo.value}`
}

exports.mockAuthInfo = mockAuthInfo
exports.mountRequestUrlWithAuthTokens = mountRequestUrlWithAuthTokens
