'use strict';

const { Service } = require('schmervice');
const nodemailer = require("nodemailer");

module.exports = class MailService extends Service {
    async mailOnCreate(user) {
        test = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: test.user,
                pass: test.pass,
            },
        });
        content = await transporter.sendMail({
            from: '"Valou" <noreply@val.com>',
            to: user.mail,
            subject: "Création de compte éffectuée",
            text: "Bienvenue" + user.firstName + " !\r\n Votre compte a bien été créé.",
            html: "<p>Bienvenue <b>" + user.firstName + "</b> !</p>Votre compte a bien été créé.</p>",
        });
        console.log("Message envoyé: %s", content.messageId, nodemailer.getTestMessageUrl(content));
    }


    async mailOnNewMovie(film, mails) {
        mailList = "";
        test = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: test.user,
                pass: test.pass,
            },
        });

        for (i = 0; i <= mails.length - 1; i++) {
            if (i == mails.length - 1) mailList += mails[i].mail;
            else mailList += mails[i].mail + ", ";
        }

        info = await transporter.sendMail({
            from: '"Valou" <noreply@val.com>',
            to: mailList,
            subject: "Nouveau film disponible !",
            text: "Un nouveau film à été ajouté : " + film.title + " !",
            html: "<p>Un nouveau film à été ajouté : <b>" + film.title + "</b> !</p>",
        });

        console.log("Message sent: %s", info.messageId, nodemailer.getTestMessageUrl(info));
    }


    async mailOnUpdate(film, mails) {
        mailList = "";
        test = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: test.user,
                pass: test.pass,
            },
        });

        for (i = 0; i <= mails.length - 1; i++) {
            if (i == mails.length - 1) mailList += mails[i].mail;
            else mailList += mails[i].mail + ", ";
        }

        info = await transporter.sendMail({
            from: '"Valou" <noreply@val.com>',
            to: mailList,
            subject: "Un de vos films favoris à été mis a jour !",
            text: film.title + " à été mis a jour !",
            html: "<p><b>" + film.title + "</b> à été mis a jour !",
        });
        console.log("Message sent: %s", info.messageId, nodemailer.getTestMessageUrl(info));
    }
}