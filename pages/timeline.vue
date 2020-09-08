<template>
  <div>
      <header>
          <div class="container">
            <nav class="main-nav">  
                <ul>
                    <li><a href="#">Úvod</a></li>
                    <li><a href="#">Zprávy</a></li> 
                    <li><a href="#">Upozornění</a></li>  
                </ul>
            </nav>
            <div class="main-logo">
                <h1>#martyisdead</h1>
            </div>
            <div class="logged-user">
                Jakub Nedorost<br/>
                <i class="las la-coins"></i> skore: 100
            </div>            
          </div>     
      </header> 
      <div class="main-wrapper">
          <div class="container">
            <aside class="left-sidebar">
                <div class="card">
                    left sidebar
                </div>
            </aside>
            <div class="main-content">
                <div class="card card--noshadow">
                    main content
                </div>
                <Post :postData="postData"/>
                <Post :postData="postData2"/> 
                <Post :postData="postData"/> 
                <Post :postData="postData"/>                 
            </div>
            <aside class="right-sidebar">
                <div class="card">
                    right sidebar
                </div>
            </aside>
          </div>
      </div>
  </div>  
</template>

<script>
import Post from "~/components/Post";
export default {
    components: {
        Post
    },
    data() {
        return {
            postData: {
                profile: {
                    id: 1,
                    name: "Jakub Mary",
                    img: "https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg",
                    url: "/profil/jakub-mary"
                },
                published: "2020-09-08T22:10:00",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ut molestiae exercitationem tenetur facilis odit neque iusto autem officia. Delectus dicta perferendis soluta quia ipsum autem saepe natus ut recusandae.",
                extraContent: {
                    type: "video",
                    url: "https://www.mall.tv/embed/s1-e1-martyisdead"
                },
                likes: 40,
                comments: 38,
                shares: 11
            },
            postData2: {
                profile: {
                    id: 1,
                    name: "Jakub Mary2",
                    img: "https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg",
                    url: "/profil/jakub-mary"
                },
                published: "2020-09-08T22:20:00",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ut molestiae exercitationem tenetur facilis odit neque iusto autem officia. Delectus dicta perferendis soluta quia ipsum autem saepe natus ut recusandae.",
                extraContent: {
                    type: "video",
                    url: "https://www.mall.tv/embed/s1-e1-martyisdead"
                },
                likes: 40,
                comments: 38,
                shares: 11
            }                
        }
    }
}
</script>

<style lang="scss">
body {
    color: #444444;
    line-height: 1.7;
    font-size: 14px;
    font-weight: 400;
    background-color: #f1f1f1; 
    font-family: "Roboto", sans-serif;   
}
a {
   color: #dc4734; 
}
.container {
    max-width: 1430px;
    width: 95%;
    margin: 0 auto;
}
header {
  width: 100%;
  position: fixed;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  padding: 10px;
  background: white;
  z-index: 5;

  .container {
      display: flex;
      justify-content: space-between;
  }

  .main-nav ul li {
      display: inline-block;
      margin-right: 30px;
  }
}
.main-wrapper {
    padding-top: 110px;
    .container {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 30px;
    }
}
.card, .post {
  background: white;  
  box-shadow: 0px 1px 15px 0px rgba(51, 51, 51, 0.2);
  padding: 20px;
  margin-bottom: 30px;  
}
.card--noshadow {
    box-shadow: unset;
}
.profile-img {
  display: block;  
  width: 45px;
  height: 45px;
  background-color: silver;  
  border-radius: 50%;
  background-size: contain;
  background-position: center;
}
.profile-name {
    font-weight: bold;
    font-size: 15px;
    text-decoration: none;
    color: black;
}
.post {
    .post__head {
        display: grid;
        grid-template-columns: 55px auto max-content;
        margin-bottom: 20px;
    }
    .post__menu {
        font-size: 25px;
    }
    .post__text {
        margin-bottom: 10px;
    }

    .post__footer {
        display: grid;
        padding: 0 10px;
        grid-template-columns: auto max-content;
        margin-top: 20px;
    }
    .post__footer-right {
        display: flex;
    }
    .post__comments {
        margin-right: 10px;
    }
}
.embed-wrapper {
    max-width: 800px;
    max-height: 450px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
}
.embed {
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
}
.embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
}
</style>
