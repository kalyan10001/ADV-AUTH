import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail=async(email,verificationToken)=>{
    const recipent=[{email}];
    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipent,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification",
        })
        console.log("email sent successfully",response);
        
    } catch (error) {
        console.error(`error in sending verification`,error);
        throw new Error(`error sending verification email:${error}`);
    }
}

export const sendwelcomeEmail=async(email,name)=>{
    const recipent=[{email}];

    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipent,
            template_uuid:"f2c392f4-31b0-490b-a10b-4fa48be20d29",
            template_variables:{
                company_info_name:"Auth Company",
                name: name,
            },
        });
        console.log("welcome email sent successfully",response);
    } catch (error) {
        console.log(`error sending welcome email`,error);
        throw new Error(`error sending welcome email:${error}`);
        
    }
}

export const sendPasswordResetEmail=async(email,resetURL)=>{
    const recipent=[{email}];
    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipent,
            subject:"reset password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"password reset",
        })
        
    } catch (error) {
        console.log("error sending password reset mail",error);
        throw new Error(`error in password reset email:${error}`);
    }
}