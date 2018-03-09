/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

/**
 *
 * @author mm67
 */
public class MarkableFileInputStream extends InputStream {

  private final Logger logger = 
      LoggerBuilder.getLogger(Constants.MODULE_CODE_MKABLE_INPUT_STREAM);
  
  private final FileInputStream in;

  private long markedPosition = -1;
  private IOException markException;

  MarkableFileInputStream(File file) throws FileNotFoundException {
    in = new FileInputStream(file);
  }

  @Override
  public synchronized void mark(int readlimit) {
    try {
      markedPosition = in.getChannel().position();
    } catch (IOException e) {
        logger.error("Failed to mark current position of the FileInputStream.");
        logger.error(e);
      markedPosition = -1;
    }
  }

  @Override
  public boolean markSupported() {
    return true;
  }

  private void throwMarkExceptionIfOccured() throws IOException {
    if (markException != null) {
      throw markException;
    }
  }

  @Override
  public synchronized void reset() throws IOException {
    throwMarkExceptionIfOccured();

    if (markedPosition >= 0) {
      in.getChannel().position(markedPosition);
    }
    else {
      throw new IOException("Stream has to be marked before it can be reset!");
    }
  }

  @Override
  public int read() throws IOException {
    return in.read();
  }

  @Override
  public int read(byte[] b) throws IOException {
    return in.read(b);
  }

  @Override
  public int read(byte[] b, int off, int len) throws IOException {
    return in.read(b, off, len);
  }
    
  @Override
  public void close() throws IOException{
      in.close();
  }
}
