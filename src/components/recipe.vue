<template>
  <div>
    <h4 class="noMargin">Total {{ totalRecipes }}</h4>
    <div class="row">
      <div
        v-for="recipe in recipes"
        :id="recipe.id"
        :key="recipe.id"
        class="col-12 col-md-3"
      >
        <q-card class="q-ma-xs">
          <q-item>
            <q-item-side :avatar="recipe.user.avtar" />
            <q-item-main>
              <q-item-tile label>
                {{ recipe.user.name }}
              </q-item-tile>
              <q-item-tile sublabel>
                {{ recipe.user.location }}
              </q-item-tile>
            </q-item-main>
            <q-btn flat dense right>
              <q-icon name="more_vert" />
              <q-popover anchor="bottom left" self="top left">
                <q-list class="scroll" style="min-width: 100px">
                  <div
                    v-for="(list, itemKey) in lists"
                    :key="itemKey"
                    v-close-overlay
                  >
                    <q-btn
                      :id="list.name"
                      align="left"
                      flat
                      size="sm"
                      :label="list.label"
                      :icon-right="list.icon"
                      class="full-width"
                      @click.native="action($event, list.name, recipe.id)"
                    />
                  </div>
                  <q-item-separator />
                </q-list>
              </q-popover>
            </q-btn>
            <!-- <q-item-side right icon="more_vert" /> -->
          </q-item>
          <q-carousel
            swipeable
            animated
            infinite
            autoplay
            transition-prev="slide-right"
            transition-next="slide-left"
            :fullscreen.sync="recipe.fullscreen"
          >
            <q-carousel-slide
              v-for="(carousel, number) in recipe.carousels"
              :key="number"
              :name="carousel.name"
              :img-src="carousel.image"
            />
            <q-carousel-control
              slot="control-button"
              slot-scope="carousel"
              position="top-right"
              :offset="[18, 22]"
            >
              <q-btn
                round
                dense
                push
                color="amber"
                :icon="carousel.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="carousel.toggleFullscreen()"
              />
            </q-carousel-control>
          </q-carousel>
          <div class="relative-position">
            <q-btn
              fab-mini
              color="primary"
              icon="share"
              class="absolute"
              size="10px"
              style="top: 0; right: 8px; transform: translateY(-50%);"
              @click="share(recipe.id)"
            />
            <q-rating
              :id="recipe.title"
              v-model="recipe.rating"
              icon="star"
              color="amber"
              :max="5"
              flat
              class="q-px-md"
            />
          </div>
          <q-card-actions vertical class="col-md-5">
            <q-btn
              flat
              color="primary"
              label="Show Recipe"
              @click="setRecipe(recipe)"
            />
          </q-card-actions>
          <q-card-separator inset />
          <q-item class="row justify-center text-center">
            <div class="col justify-center q-item-sublabel">
              <div>Prep Time</div>
              <div>
                <q-icon name="access_time" /> {{ recipe.preprationTime }} m
              </div>
            </div>
            <div class="col justify-center q-item-sublabel">
              <div>Cook Time</div>
              <div><q-icon name="av_timer" /> {{ recipe.cookTime }} m</div>
            </div>
            <div class="col justify-center q-item-sublabel">
              <div>Total Time</div>
              <div>
                <q-icon name="timer" />
                {{ recipe.preprationTime + recipe.cookTime }} m
              </div>
            </div>
          </q-item>
          <q-card-separator />
          <q-item-main class="q-pa-md">
            <q-item-tile label>
              {{ recipe.title }}
            </q-item-tile>
            <q-item-tile sublabel>
              {{ recipe.subTitle }}
            </q-item-tile>
          </q-item-main>
        </q-card>
      </div>
    </div>
    <q-modal v-model="positionModal" :position="position">
      <div class="q-display-2 q-mb-md">
        <q-item>
          <q-btn flat dense right @click="positionModal = false">
            <q-icon name="close" />
          </q-btn>
        </q-item>
        <q-item>
          <social-sharing :url="url" />
        </q-item>
      </div>
    </q-modal>
  </div>
</template>

<script>
import SocialSharing from '~/components/social-sharing'
export default {
  components: {
    SocialSharing
  },
  props: {
    recipes: Array,
    totalRecipes: Number
  },
  data() {
    return {
      positionModal: false,
      position: 'bottom',
      slide: 1,
      fullscreen: false,
      url: '#',
      lists: [
        {
          name: 'edit',
          label: 'Edit',
          icon: 'edit'
        },
        {
          name: 'delete',
          label: 'Delete',
          icon: 'delete'
        }
      ]
    }
  },
  methods: {
    action(e, click, id) {
      console.log(e)
      this.$q.notify(
        (this.$q.platform.is.desktop ? 'Clicked' : 'Tapped') +
          ' on a Popover item' +
          id
      )
    },
    setRecipe(recipe) {
      this.$router.push({
        name: 'recipe-id',
        path: '/recipe/:id?',
        component: 'pages/recipe/_id.vue',
        params: { id: recipe.id }
      })
    },
    share(id) {
      console.log(id)
      const baseUrl = `${window.location.href}recipe/`
      this.url = `${baseUrl}${id}`
      this.positionModal = !this.positionModal
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
}
.fixed-top {
  z-index: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.q-card-media-overlay {
  background: rgba(2, 3, 142, 0.47);
}
.q-carousel-inner {
  height: 380px !important;
}
body > .fullscreen {
  background-color: rgba(0, 0, 0, 0.44);
}
.fullscreen > .q-carousel-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: auto;
  height: max-content;
}
</style>
