require('dotenv').config();
import nodemailer from 'nodemailer';
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Bệnh viện 👻" <dactruong23062001@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyEmail(dataSend), 
      });
}

let getBodyEmail = (dataSend) => {
  let result = ''
  if(dataSend.language === 'vi'){
      result = 
    `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được mail này vì bạn đã đặt lịch khám bệnh online trên trang của chúng tôi</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian : ${dataSend.time}</b></div>
    <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>


    <p>Đã xác nhận lại lịch hẹn, vui lòng click vào đường link ở bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div>
    <a href = ${dataSend.redirectLink} target = "_blank">Click here</a>
    </div>

    <div>Xin chân thành cảm ơn</div>
      `
      return result;
  }
  if(dataSend.language === 'en'){
     result = 
    `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on our site</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time : ${dataSend.time}</b></div>
    <div><b>Doctor : ${dataSend.doctorName}</b></div>


    <p>To reconfirm your appointment, please click on the link below to confirm and complete the booking procedure.</p>
    <div>
    <a href = ${dataSend.redirectLink} target = "_blank">Click here</a>
    </div>

    <div>Thank you!</div>
      `
      return result;
  }
}
module.exports = {
    sendSimpleEmail : sendSimpleEmail
}