import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailServiceClass {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.createTransporter();
  }

  private createTransporter(): nodemailer.Transporter {
    // Configuração para desenvolvimento (Ethereal Email)
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'ethereal.user@ethereal.email',
          pass: 'ethereal.pass'
        }
      });
    }

    // Configuração para produção
    const config: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    };

    return nodemailer.createTransport(config);
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      const mailOptions = {
        from: `"VitrineLux" <${process.env.SMTP_FROM || 'noreply@vitrinelux.com'}>`,
        to,
        subject: 'Bem-vindo à VitrineLux! 🚗',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #f8fafc; margin: 0; font-size: 28px;">VitrineLux</h1>
              <p style="color: #cbd5e1; margin: 10px 0 0 0;">Dirija o Futuro. Seu Próximo Carro Está Aqui.</p>
            </div>
            
            <div style="padding: 40px 20px; background: #ffffff;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0;">Olá, ${name}! 👋</h2>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
                Seja muito bem-vindo à <strong>VitrineLux</strong>! Estamos muito felizes em tê-lo conosco.
              </p>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
                Agora você tem acesso a nossa curadoria exclusiva de veículos premium, com:
              </p>
              
              <ul style="color: #475569; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                <li>🔍 Inspeção técnica rigorosa de 150 pontos</li>
                <li>🏆 Curadoria premium de veículos de alto padrão</li>
                <li>🤝 Atendimento boutique personalizado</li>
                <li>🛡️ Garantia estendida de 2 anos</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/estoque" 
                   style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Explorar Estoque
                </a>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin: 30px 0 0 0; text-align: center;">
                Se você tiver alguma dúvida, nossa equipe está sempre disponível para ajudar.
              </p>
            </div>
            
            <div style="background: #f1f5f9; padding: 20px; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2024 VitrineLux. Todos os direitos reservados.
              </p>
            </div>
          </div>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email de boas-vindas enviado!');
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      
    } catch (error) {
      console.error('Erro ao enviar email de boas-vindas:', error);
      throw error;
    }
  }

  async sendContactEmail(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<void> {
    try {
      const mailOptions = {
        from: `"VitrineLux" <${process.env.SMTP_FROM || 'noreply@vitrinelux.com'}>`,
        to: process.env.CONTACT_EMAIL || 'contato@vitrinelux.com',
        subject: `Nova mensagem de contato - ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e293b;">Nova Mensagem de Contato</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Telefone:</strong> ${data.phone}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #1e293b;">Mensagem:</h3>
              <p style="background: #ffffff; padding: 15px; border-left: 4px solid #1e293b; margin: 0;">
                ${data.message}
              </p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      
    } catch (error) {
      console.error('Erro ao enviar email de contato:', error);
      throw error;
    }
  }

  async sendTestDriveConfirmation(data: {
    name: string;
    email: string;
    vehicleName: string;
    date: string;
    time: string;
  }): Promise<void> {
    try {
      const mailOptions = {
        from: `"VitrineLux" <${process.env.SMTP_FROM || 'noreply@vitrinelux.com'}>`,
        to: data.email,
        subject: `Test Drive Confirmado - ${data.vehicleName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #f8fafc; margin: 0; font-size: 28px;">Test Drive Confirmado! 🚗</h1>
            </div>
            
            <div style="padding: 40px 20px; background: #ffffff;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0;">Olá, ${data.name}!</h2>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
                Seu test drive foi confirmado com sucesso! Aqui estão os detalhes:
              </p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Veículo:</strong> ${data.vehicleName}</p>
                <p style="margin: 5px 0;"><strong>Data:</strong> ${data.date}</p>
                <p style="margin: 5px 0;"><strong>Horário:</strong> ${data.time}</p>
              </div>
              
              <p style="color: #475569; line-height: 1.6; margin: 20px 0;">
                Nossa equipe entrará em contato em breve para confirmar os detalhes finais.
              </p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      
    } catch (error) {
      console.error('Erro ao enviar confirmação de test drive:', error);
      throw error;
    }
  }
}

// Exportar tanto a classe quanto uma instância
export const EmailService = new EmailServiceClass();
export default EmailService;