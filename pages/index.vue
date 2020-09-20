<template>
  <div>
      <div class="main-wrapper">
          <div class="container homepage-grid">
            <aside class="left-sidebar">
                <div class="card">
                    <h3>Profil</h3>
                    Počet přátel: 43<br/>
                    Počet nevyřízených žádostí: 2

                </div>

                    <p style="position: fixed; bottom: 20px;">(c) 2020 Internet Mall, a.s.</p>
               
            </aside>
            <div class="main-content">
                <div class="card card--noshadow">
                    <CreateNewPost />
                </div>
                <Post :postData="postData"/>
                <Post :postData="postData2"/> 
                <Post :postData="postData"/> 
                <Post :postData="postData"/>                 
            </div>
            <aside class="right-sidebar">
                <div class="card">
                    <h3>Kontakty</h3>
                    <Contacts />
                </div>
                <div class="card">
                    <h3>Stránky</h3>
                </div>                
            </aside>
          </div>
      </div>
  </div>  
</template>

<script>
import HeaderUserPanel from "~/components/HeaderUserPanel";
import CreateNewPost from "~/components/CreateNewPost";
import Post from "~/components/post/Post";
import Contacts from "~/components/Contacts";

export default {
    components: {
        Post,
        HeaderUserPanel,
        CreateNewPost,
        Contacts
    },
    data() {
        return {
            postData: {
                profile: {
                    userId: "me",
                    name: "Jakub Mary",
                    img: "https://demo.hasthemes.com/adda-preview/adda/assets/images/profile/profile-small-1.jpg",
                    url: "/profil/jakub-mary"
                },
                published: "2020-09-10T21:10:00",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ut molestiae exercitationem tenetur facilis odit neque iusto autem officia. Delectus dicta perferendis soluta quia ipsum autem saepe natus ut recusandae.",
                extraContent: {
                    type: "photo",
                    url: [ 
                        "https://www.irozhlas.cz/sites/default/files/styles/zpravy_otvirak_velky/public/uploader/jakub_nemcok_jako_pa_191018-093542_kro.JPG?itok=ZpzwVeCA",
                        "https://img.blesk.cz/img/1/normal690/5994234-img-marty-is-dead-v0.jpg",
                        "https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/683/2020/01/03230000/Getty_Buckinghams630_010320.jpg"
                    ]
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
                published: "2020-09-03T22:20:00",
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
    },
    methods: {
        changePoints(points) {
            this.$store.commit('changePoints', points);
        }          
    }
}
</script>

<style scoped>

</style>
