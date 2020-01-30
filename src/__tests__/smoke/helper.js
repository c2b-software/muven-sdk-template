const mockAuthInfo = {
    api_host: "https://somewebapioutthere.wat.com",
    access_token: "abc123",
}

const mountRequestUrlWithAccessToken = function(path, queryinfo) {
    if (!queryinfo) {
        return `${mockAuthInfo.api_host}${path}?access_token=${mockAuthInfo.access_token}`
    }

    return `${mockAuthInfo.api_host}${path}?access_token=${mockAuthInfo.access_token}&${queryinfo.key}=${queryinfo.value}`
}

exports.mockAuthInfo = mockAuthInfo
exports.mountRequestUrlWithAccessToken = mountRequestUrlWithAccessToken
