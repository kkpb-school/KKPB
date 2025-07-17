'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, User } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageChange: (url: string | null) => void;
  currentImage?: string | null;
}

export function ImageUpload({ onImageChange, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {preview ? (
              <div className="relative">
                <Image
                  src={preview}
                  alt="Student preview"
                  width={120}
                  height={120}
                  className="border-muted rounded-full border-4 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemove}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="bg-muted border-muted flex h-[120px] w-[120px] items-center justify-center rounded-full border-4">
                <User className="text-muted-foreground h-12 w-12" />
              </div>
            )}
          </div>

          <div className="space-y-2 text-center">
            <Button type="button" variant="outline" onClick={handleClick}>
              <Upload className="mr-2 h-4 w-4" />
              {preview ? 'Change Photo' : 'Upload Photo'}
            </Button>
            <p className="text-muted-foreground text-xs">
              JPG, PNG or GIF (max. 5MB)
            </p>
          </div>
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
