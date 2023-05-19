//Send metrics info
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable ' + variable + ' not found');
    return "";
}

(function() {
    function paramToForm(param) {
        var id = getQueryVariable(param);
        if (id === '') {
            return;
        }
        var forms = document.querySelectorAll("form");
        var hiddenRefInput = "<input name='" + param + "' type='hidden' value='" + id +"'/>";
        var keys = Object.keys(forms);
        keys.forEach(function(e) {
            forms[e].insertAdjacentHTML("beforeend", hiddenRefInput);
        });
    }

    function setFormAction() {
        var query = window.location.search.substring(1);
        var action = 'https://mystudybay.com.br/order/unregOrderShortForm/?' + query;
        var forms = document.querySelectorAll("form");
        forms[0].action = action;
        forms[1].action = action;
    }

    var params = ['rid', 'ref', 'utm_term', 'utm_campaign', 'utm_source', 'utm_medium', 'edugram_request_id'];
    params.map(paramToForm)
    setFormAction()
}());

//Send GA with url
document.addEventListener('submit', function (e) {
    let g = window[window['GoogleAnalyticsObject']];
    if (g && typeof g.getAll === 'function') {
        e.target.action = (new window.gaplugins.Linker(g.getAll()[0])).decorate(e.target.action);
    }
});

//Set reg_url
function addUrlLocation(){
    let inputs = document.getElementsByName('reg_url');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = location.href;
    }
}
addUrlLocation();

const scrollToButton = () => {

    const btnOrder = document.querySelectorAll('.yakar');

    btnOrder.forEach((a) => {
        a.addEventListener('click', (event) => {
            scroll(event);
        });
    })

    const scroll = (e) => {
        e.preventDefault();
        let href = e.target.getAttribute('yak');
        console.log(href);

        const scrollTarget = document.querySelector(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    };
};
scrollToButton();

document.querySelector('.more_event').addEventListener('click', (event) => {
    let teachers = document.querySelector('.teachers-wrapper');
    let show = document.querySelector('.more_event');
    let trahar = document.querySelector('.trahar');

    teachers.classList.add('open_teachers');
    show.classList.remove('more_event');
    trahar.classList.add('show');
})

const toggleModal = () => {
    const modalCallback = document.getElementById('callback'),
        modalOverlay = document.querySelector('.modal-overlay'),
        body = document.querySelector('body');


    body.addEventListener('click', (event) => {
        let target = event.target;
        if(target.matches('.callback-btn')){
            modalCallback.style.display = 'block';
            modalOverlay.style.display = 'block';
        } else if(target.closest('.modal-close') || target.matches('.modal-overlay')){
            modalCallback.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
};
toggleModal();

const sendForm = (e) => {
    const form = e.closest('form'),
        title = form.querySelector("input[name='title']"),
        email = form.querySelector('input[name="email"]'),
        type_name = form.querySelector('input[name="type_id"]').getAttribute('data-name'),
        type_id = form.querySelector('input[name="type_id"]');

    title.classList.remove('mako_error');
    email.classList.remove('mako_error');

    let count_error = 0;
    const regexp_email = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (title.value.length < 3) {
        title.classList.add('mako_error');
        count_error++
    }

    console.log(regexp_email.test(email.value), email.value);
    if (!regexp_email.test(email.value)) {
        email.classList.add('mako_error');
        count_error++
    }

    if (count_error > 0) return false;

    let form_data = new FormData();

    form_data.append('title', title.value);
    form_data.append('email', email.value);
    if (type_id.value) form_data.append('type_id', type_id.value);

    try {
        let mConnect = () => {
            const deadline = new Date(Date.now() + 12096e5).toLocaleDateString();
            let redirect = 'https://live.mystudybay.co/chat/est?custom_text_title='+title.value+'&custom_text_type='+type_name+'&custom_text_email='+email.value+'&custom_text_deadline=' + deadline;

            const url = new URL(window.location.href);

            let referal = null;
            if (url.searchParams.get('ref')) {
                referal = url.searchParams.get('ref');
            } else {
                if (url.searchParams.get('rid')) {
                    referal = url.searchParams.get('rid');
                }
            }

            if (referal) {
                redirect += '&custom_text_ref=' + referal;
            }

            window.location.assign(redirect);
        }

        mConnect();


    } catch (e) {
        console.error(e);
    }

}

const topSendBtn = document.querySelectorAll('.submit').forEach((item) => {
    item.addEventListener('click', function () {
        sendForm(this);
    })
})
