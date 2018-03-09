package com.newegg.edi.x12engine.util;

import org.junit.Test;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertEquals;
import java.io.*;

public class FileInputStreamReaderFactoryTest extends TestBase{

    private void test_build_input_stream_reader(String encoding) throws IOException {
        String file = "x12/X12_856_00401_000002032.txt";

        File sampleFile = super.getSampleFile(file);

        FileInputStreamReaderFactory srf = new FileInputStreamReaderFactory(
                new FileInputStreamFactory());

        InputStreamReader reader = null;
        try {
            reader = srf.build(sampleFile.getPath(), encoding);

            assertNotNull(reader);

            char[] buffer = new char[106];
            reader.read(buffer);
            String data = String.valueOf(buffer);
            System.out.println(data);
            assertEquals(106, data.length());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        finally {

            if(reader != null) {
                reader.close();
            }
        }

    }

    @Test
    public void test_build_input_stream_reader_without_encoding() throws IOException {
        test_build_input_stream_reader(null);
    }

    @Test
    public void test_build_input_stream_reader_with_encoding() throws IOException {
        test_build_input_stream_reader("ISO-8859-1");
    }

    @Test
    public void test_build_input_stream_reader_with_encoding2() throws IOException {
        test_build_input_stream_reader("UTF-8");
    }
}
