namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //método assíncrono para envio de email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}