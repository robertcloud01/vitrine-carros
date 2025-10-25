import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const vehicleId = formData.get('vehicleId') as string;
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }
    
    // Validar tipos de arquivo
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    
    const maxImageSize = 5 * 1024 * 1024; // 5MB para imagens
    const maxVideoSize = 50 * 1024 * 1024; // 50MB para vídeos
    
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Tipo de arquivo não permitido: ${file.type}. Use JPEG, PNG, WebP para imagens ou MP4, WebM para vídeos.` },
          { status: 400 }
        );
      }
      
      // Verificar tamanho baseado no tipo de arquivo
      const isVideo = allowedVideoTypes.includes(file.type);
      const maxSize = isVideo ? maxVideoSize : maxImageSize;
      
      if (file.size > maxSize) {
        const maxSizeMB = isVideo ? '50MB' : '5MB';
        return NextResponse.json(
          { error: `Arquivo muito grande: ${file.name}. Máximo ${maxSizeMB} para ${isVideo ? 'vídeos' : 'imagens'}.` },
          { status: 400 }
        );
      }
    }
    
    const uploadedFiles = [];
    
    // Criar diretório se não existir
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'vehicles');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const fileName = `${vehicleId || 'temp'}_${timestamp}_${randomString}.${extension}`;
      
      const filePath = join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      
      const publicUrl = `/uploads/vehicles/${fileName}`;
      
      uploadedFiles.push({
        originalName: file.name,
        fileName,
        url: publicUrl,
        size: file.size,
        type: file.type,
      });
    }
    
    console.log('Arquivos enviados:', uploadedFiles);
    
    return NextResponse.json({
      message: 'Arquivos enviados com sucesso',
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'Nome do arquivo é obrigatório' },
        { status: 400 }
      );
    }
    
    // Em produção, aqui deletaria o arquivo do sistema de arquivos
    // e removeria a referência do banco de dados
    console.log('Deletando arquivo:', fileName);
    
    return NextResponse.json({
      message: 'Arquivo deletado com sucesso',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}