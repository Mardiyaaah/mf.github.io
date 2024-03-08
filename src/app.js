document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
       items: [
        { id: 1, name: 'Combad Premium- Biru Saxony', img: '1bs.jpg', price: 45000 },
        { id: 2, name: 'Combad Premium- Maroon', img: '2m.jpg', price: 45000 },
        { id: 3, name: 'Combad Premium- Hijau Botol', img: '3h.jpg', price: 45000 },
        { id: 4, name: 'Combad Premium- Putih', img: '4p.jpg', price: 45000 },
        { id: 5, name: 'Combad Premium- Hitam', img: '5i.jpg', price: 45000 },
        { id: 6, name: 'Combad Premium- Orange Bata', img: '6o.jpg', price: 45000 },
        { id: 7, name: 'Combad Premium- Hijau Semen', img: '7hm.jpg', price: 45000 },
        { id: 8, name: 'Combad Premium- Abu Tua', img: '8abu.jpg', price: 45000 },
        { id: 9, name: 'Combad Premium- Merah Bata', img: '9mu.jpg', price: 45000 },
        { id: 10, name: 'Combad Premium- Hijau Sage', img: '10hs.jpg', price: 45000 },
        { id: 11, name: 'Combad Premium- Animasi RX Gudam', img: '1nimasi.jpg', price: 85000 },
    ],


    }))

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama dicart
            const cartitem = this.items.find((item) => item.id === newItem.id);

            // jika belom ada / cart masih kosong
            if(!cartitem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else{
                // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else{
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }

                })
            }
            console.log(this.total);
        },
        remove (id) {
            // ambil item yang mau diremove berdasarkan id nya
            const cartitem = this.items.find((item) => item.id === id);

            // jika barang lebih dari 1
            if(cartitem.quantity > 1) {
                // telusuri item 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartitem.quantity === 1) {
                // jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartitem.price;
            }
        }
    });
    });

// Form Validation
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.disabled = true;

    const form = document.querySelector('#checkoutForm');

    form.addEventListener('keyup', function() {
        for(let i = 0; i < form.elements.lenght; i++) {
            if(form.elements[i].value.lenght !== 0) {
                checkoutButton.classList.remove('disabled');
                checkoutButton.classList.add('disabled');
            } else {
                return false;
            }
        }
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
    })

    // kirim data ketika tombol checkout di klik
    checkoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);
        const objData = Object.fromEntries(data);
        console.log(objData);
        const message = formatMessage(objData);
        window.open('http://wa.me/6285780776108?text=' + encodeURIComponent(message));
    })


    // format pesan whatsapp
    const formatMessage = (obj) => {
        return `Data Customer:
Nama: ${obj.name}
Alamat: ${obj.alamat}
No HP: ${obj.phone}
 Data Pesanan:
 ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
 TOTAL: ${rupiah(obj.total)}  
 Terimakasih. `;
    }



    // konversi ke rupiah
    const rupiah = (number) => {
        return new Intl.NumberFormat( 'id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };