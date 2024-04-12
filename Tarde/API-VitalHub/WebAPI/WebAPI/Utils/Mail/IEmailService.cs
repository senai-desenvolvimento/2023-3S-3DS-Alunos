namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //método asssíncrono para envio de e-mail
        Task SendEmailAsync(MailRequest mailRequest);
    }
}