export type parsedDataType = {
    token:string
    userId:string
}

export type objectOfDataType = {
    id:string
    name:string
    surname:string
    email:string
    password:string
}

export type nodemailerMessageType = {
    from: string
    to: string
    subject: string
    text:string
}

export type checkUserType = {
    email: string,
    name: string,
    surname: string,
    password: string,
}

export type LoginType = {
    loginEmail:string
    loginPassword:string
}

export type changePasswordType = {
    oldPassword:string
    email:string
}

export type SavePasswordType = {
    verificationCode: string
    email: string
    password: string
    code: string
    newPassword:string
}

export type saveUserType = {
    verificationCode: string
    email: string
    name: string
    surname: string
    password: string
    code: string
}