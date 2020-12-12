<script>
    import Biblioteca from "./Biblioteca.svelte";
    import EbookList from "./EbookList.svelte";
    import Apostilas from "./Apostilas.svelte";
</script>

<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
        background-image: url(https://i.pinimg.com/originals/c4/d1/e0/c4d1e083acbdb201927e50b2486283b1.png);
        opacity: 0.95;
    }

    p {
        font-size: 20px;
        text-align: justify;
        padding-left: 15px;
        padding-right: 15px;
        font-family: serif;
        text-indent: 40px
    }

    .banner {
        width: 100%;
        vertical-align: middle;
    }

    .principal {
        font-size: 22px;
        background-color: #ffffff;
        margin: 5px 150px;
    }

    .container {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: center;
        margin-bottom: 30px;
    }
    .category {
        width: 25%;
        margin: 30px 1.53333%;
        border: 5px solid #fff;
        background: #fff;
        line-height: 35px;
        box-shadow: 0 10px 20px #999;
        display: inline-block;
    }

    .imagem {
        width: 100%;
        height: 150px;
        background: black;
    }

    .panel {
        background-color: #c0c0c0;
        padding: 10px;
        border: 5px solid #fff;
        opacity: 1;
    }


</style>

<main>
    <header>
        <img class="banner" src="./banner.jpg" alt="Falha ao carregar" />
    </header>
    <body>
        <div class="principal">
            <h1>Biblioteca Virtual</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent sodales felis nec lacinia dapibus. Praesent tempus
                turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet
                justo eu dolor varius consequat sit amet non felis. Cras luctus
                convallis blandit. Donec eget iaculis ipsum. Phasellus ligula
                neque, convallis in dictum ac, cursus non neque. Integer sit
                amet convallis turpis, in fringilla tortor. Curabitur interdum
                neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit
                amet pulvinar orci, at pellentesque dolor. Proin fringilla id
                felis sed egestas. Aliquam molestie sit amet orci ac consequat.
            </p>
            <div class="container">
                <div class="category">
                    <img
                        class="imagem"
                        src="https://miro.medium.com/max/3200/1*722H7nWsDQ0D-ReOKoRytQ.jpeg"
                        alt="Falha ao carregar" />
                    <h3>Livros</h3>
                </div>
                <div class="category">
                    <img
                        class="imagem"
                        src="https://miro.medium.com/max/3200/1*722H7nWsDQ0D-ReOKoRytQ.jpeg"
                        alt="Falha ao carregar" />
                    <h3>E-books</h3>
                </div>
                <div class="category">
                    <img
                        class="imagem"
                        src="https://miro.medium.com/max/3200/1*722H7nWsDQ0D-ReOKoRytQ.jpeg"
                        alt="Falha ao carregar" />
                    <h3>Apostilas</h3>
                </div>
            </div>

            <div>
                <div class="panel">
                    <h1>Livros</h1>
                    <Biblioteca />
                </div>
                <div class="panel">
                    <h1>E-books</h1>
                    <EbookList />
                </div>
                <div class="panel">
                    <h1>Apostilas</h1>
                    <Apostilas />
                </div>
            </div>
        </div>
    </body>
</main>
