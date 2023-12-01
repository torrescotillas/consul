require "open-uri"
require "httparty"
require "nokogiri"
class SMSApi
  attr_accessor :client

  def initialize
    @client = Savon.client(wsdl: url)
  end

  def url
    return "" unless end_point_available?

    URI.parse(Tenant.current_secrets.sms_end_point).to_s
  end

  def authorization
    Base64.encode64("#{Tenant.current_secrets.sms_username}:#{Tenant.current_secrets.sms_password}")
  end

  def sms_deliver(phone, code)
    return stubbed_response unless end_point_available?

    url = 'http://sms.smsbroker.net:11000/api/sendSMS.php'
    user = ENV['USER_TELKIA']
    pw = ENV['PW_TELKIA']
    snr = 'AytCotillas'
    msg = "Clave para verificarte: #{code}. Participación Ciudadana."

    response = HTTParty.get(url, query: {
      user: user,
      pw: pw,
      dnr: phone,
      snr: snr,
      msg: msg,
      test: 0
    })

    success?(response)
  end

  def request(phone, code)
    { autorizacion:  authorization,
      destinatarios: { destinatario: phone },
      texto_mensaje: "Clave para verificarte: #{code}. Gobierno Abierto",
      solicita_notificacion: "All" }
  end

  def success?(response)

    # Parsear el XML usando Nokogiri
    doc = Nokogiri::XML(response.body)

    # Extraer el valor de 'status'
    status = doc.at_xpath('//status').text

    status == 'OK'
    
  end

  def end_point_available?
    Rails.env.staging? || Rails.env.preproduction? || Rails.env.production? || Rails.env.development?
  end

  def stubbed_response
    {
      respuesta_sms: {
        identificador_mensaje: "1234567",
        fecha_respuesta: "Thu, 20 Aug 2015 16:28:05 +0200",
        respuesta_pasarela: {
          codigo_pasarela: "0000",
          descripcion_pasarela: "Operación ejecutada correctamente."
        },
        respuesta_servicio_externo: {
          codigo_respuesta: "1000",
          texto_respuesta: "Success"
        }
      }
    }
  end
end
