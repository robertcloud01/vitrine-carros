# Configuração do Vídeo Hero

## Passos para configurar o vídeo:

### 1. Criar as pastas necessárias
```bash
mkdir -p public/videos
mkdir -p public/images
```

### 2. Baixar o vídeo do Pexels
1. Acesse: https://www.pexels.com/video/shiny-black-car-6873503/
2. Clique em "Free Download"
3. Escolha a qualidade "HD" (1920x1080) para melhor performance
4. Salve o arquivo como `hero-car.mp4` na pasta `public/videos/`

### 3. Otimizar o vídeo (opcional, mas recomendado)
Se você tiver o FFmpeg instalado, pode otimizar o vídeo:

```bash
# Converter para WebM (melhor compressão)
ffmpeg -i public/videos/hero-car.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus public/videos/hero-car.webm

# Criar uma versão comprimida do MP4
ffmpeg -i public/videos/hero-car.mp4 -vcodec h264 -acodec mp2 -crf 28 -preset slow public/videos/hero-car-compressed.mp4
```

### 4. Criar imagem de poster (opcional)
Extrair um frame do vídeo para usar como poster:

```bash
ffmpeg -i public/videos/hero-car.mp4 -ss 00:00:02 -vframes 1 public/images/hero-poster.jpg
```

### 5. Estrutura final esperada: