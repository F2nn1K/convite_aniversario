// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://cszkyerpkmssmdhnjvsz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemt5ZXJwa21zc21kaG5qdnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzIzODAsImV4cCI6MjA3NzQwODM4MH0.qC-NQhLpns0arj3vHUj-ZSQqj1M7tzr02M_TpQsp4GI';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('confirmationForm');
    const whatsappInput = document.getElementById('whatsapp');

    // Máscara para WhatsApp
    whatsappInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                e.target.value = value;
            } else if (value.length <= 7) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        } else {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
    });

    // Submissão do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const whatsapp = whatsappInput.value;
        const guests = document.getElementById('guests').value;
        const submitButton = form.querySelector('.btn-confirm');

        // Desabilitar botão durante envio
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            // Salvar no Supabase
            const response = await fetch(`${SUPABASE_URL}/rest/v1/confirmacoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    nome: name,
                    whatsapp: whatsapp,
                    acompanhantes: parseInt(guests),
                    total_pessoas: parseInt(guests) + 1,
                    data_hora: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar');
            }

            // Mostrar SweetAlert com a imagem
            await Swal.fire({
                title: 'Presença confirmada!',
                text: 'Obrigado! Nos vemos na festa! 🎊',
                imageUrl: 'public/say.jpg',
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'Convite',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff6b9d',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdrop: `
                    rgba(26, 26, 46, 0.8)
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239f0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%238f0088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E")
                    left top
                    no-repeat
                `
            });

            form.reset();
            
        } catch (error) {
            console.error('Erro:', error);
            
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'Erro ao confirmar presença. Tente novamente!',
                confirmButtonColor: '#ff6b9d'
            });
        } finally {
            // Reabilitar botão
            submitButton.disabled = false;
            submitButton.textContent = 'Confirmar Presença ✓';
        }
    });
});

