'use strict'

const SEND_GRID = require('@sendgrid/mail');
SEND_GRID.setApiKey("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");
module.exports = class EmailUtil{
    
    static async sendForgotPasswordEmail(user){
        try {
            let msg =  {
                to:user.email,
                from: 'noreply@sharehood.com',
                subject: 'Sharehood App',
                html: `
                <h2>Recuperação de Senha</h2>
                <h3>Você solicitou a recuperação de sua senha pelo aplicativo <b>Sharehood</b></h3>
                
                <div>Aqui está a sua senha: <b>${user.password}</b></div>
                `,
                
            };
            let email = await SEND_GRID.send(msg);
            if(!email) throw {
                message: 'Falha ao enviar Email',
                status: 500
            }
        } catch (error) {
            console.log(error);
         throw {
            message: error.message || `EmailUtil: Falha ao enviar email: ${error.message}`,
            status: 500
         }
            
        }
    }
}