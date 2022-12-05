<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-card>
                <v-card-actions>
                  <v-menu offset-y>
                    <template #activator="{on, attrs}">
                      <v-btn color="primary" v-bind="attrs" v-on="on">
                        ダウンロード
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="item in downloadFiles" :key="item.id" :href="getDownloadUrl(item)">
                        <v-list-item-content>
                          <v-list-item-title>元画像 ({{ item.fileType }})</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item v-if="previewUrl" :href="previewUrl">
                        <v-list-item-title>プレビュー用 (jpeg)</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col />
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="10">
        <v-card>
          <v-img :src="previewUrl" max-height="720" contain />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePhotoStore } from '~/store/photo-store'
import useAlertStore from '~/store/alert-store'

export default defineComponent({
  name: 'PhotoPage',
  middleware: ['authenticated'],
  setup () {
    const photoStore = usePhotoStore()
    return {
      photoStore,
      alertStore: useAlertStore(),
    }
  },
  computed: {
    downloadFiles () {
      const photo = this.photoStore.photo
      if (photo === null || photo === undefined) {
        return []
      }
      return photo.files
    },
    previewUrl () {
      return this.photoStore.photo !== null ? this.photoStore.photo?.previewUrl : ''
    },
  },
  created () {
    const id = this.$route.params.id
    this.photoStore.getPhoto(id)
  },
  methods: {
    getDownloadUrl (photoFile: { id: string }) {
      return `/api/download/files/${photoFile.id}`
    },
  },
})
</script>
