using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //variável que armazena as configs de EmailSettings
        private readonly EmailSettings emailSettings;

        //construtor que recebe a dependence injection de EmailSettings
        public EmailService(IOptions<EmailSettings> options)
        {
           emailSettings = options.Value;
        }

        //método para envio de e-mail
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto qque representa o e-mail
                var email = new MimeMessage();

                //define o remetente do e-mail
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //define o destinatário do e-mail
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define o assunto do email
                email.Subject = mailRequest.Subject;

                //cria o corpo do email
                var builder = new BodyBuilder();

                //define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no obj MimeMessage
                email.Body = builder.ToMessageBody();

                //cria um client SMTP para envio de email
                using (var smtp = new SmtpClient())
                {
                    //conecta-se ao servidor SMTP usando os dados de emailSettings
                    smtp.Connect(emailSettings.Host,emailSettings.Port,SecureSocketOptions.StartTls);

                    //autentica-se no servidor SMTP usando os dados de emailSettings
                    smtp.Authenticate(emailSettings.Email,emailSettings.Password);

                    //envia o email
                    await smtp.SendAsync(email);
                }

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
