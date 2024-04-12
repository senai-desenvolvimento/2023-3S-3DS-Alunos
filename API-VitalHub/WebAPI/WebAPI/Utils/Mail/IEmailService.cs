namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //método asincrono para envio de email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}