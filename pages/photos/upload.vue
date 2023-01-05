<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-card-title>写真をアップロード</v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <file-uploader
                  v-model="files"
                  prepend-icon="mdi-camera"
                  label="写真をアップロード ( JPEG | RAW )"
                  :multiple="true"
                  :accepts="['image/jpeg', '.raw', '.arw']"
                  :loading="loading"
                  :progress="progress"
                  @commit="onCommit"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUploader from '~/components/modules/FileUploader.vue'
import { usePhotoStore } from '~/store/photo-store'
import useAlertStore from '~/store/alert-store'
import { useMeStore } from '~/store/me-store'

export default defineComponent({
  name: 'PhotoUploadPage',
  components: { FileUploader },
  middleware: ['authenticated'],
  setup () {
    return {
      photoStore: usePhotoStore(),
      alertStore: useAlertStore(),
      meStore: useMeStore(),
    }
  },
  data () {
    return {
      files: [] as Array<File>,
      loading: false,
      progress: -1,
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    async onCommit () {
      try {
        this.progress = 0
        this.loading = true
        await this.uploadPhotos(this.files)
        this.files = []
        this.alertStore.displayMessage('アップロードが完了しました。')
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async uploadPhotos(files: File[]) {
      const successfulFiles = [] as Array<File>
      const failedFiles = [] as Array<File>
      await Promise.all(files.map(async (file) => {
        try {
          await this.photoStore.uploadPhoto(file, this.meStore.group.id)
          this.progress++
          successfulFiles.push(file)
        } catch (err) {
          console.error(err)
          this.alertStore.displayError(`${file.name}のアップロードを失敗ました。`)
          failedFiles.push(file)
        }
      }))
      return {successfulFiles, failedFiles}
    },
  },
})
</script>
