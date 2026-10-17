ARG BASE=ghcr.io/joaofazolo/boca-docker/boca-jail:latest
FROM ${BASE}
USER root
COPY src/ /var/www/boca/src/
COPY tools/ /var/www/boca/tools/
COPY boca-docker/boca/src/private/conf.php /var/www/boca/src/private/conf.php
# Keep a complete JDK tree: upstream copied binaries without libjli.so.
RUN test -d /usr/lib/jvm/java-17-openjdk-amd64 \
    && mkdir -p /home/bocajail/usr/lib/jvm \
    && cp -a /usr/lib/jvm/java-17-openjdk-amd64 /home/bocajail/usr/lib/jvm/ \
    && cp -a /etc/java-17-openjdk /home/bocajail/etc/ \
    && ln -sf /usr/lib/jvm/java-17-openjdk-amd64/bin/java /home/bocajail/usr/bin/java \
    && ln -sf /usr/lib/jvm/java-17-openjdk-amd64/bin/javac /home/bocajail/usr/bin/javac \
    && printf '%s\n' /usr/lib/jvm/java-17-openjdk-amd64/lib /usr/lib/jvm/java-17-openjdk-amd64/lib/server > /home/bocajail/etc/ld.so.conf.d/seminfo-java.conf \
    && chroot /home/bocajail /sbin/ldconfig \
    && chroot /home/bocajail /usr/bin/java -version \
    && chroot /home/bocajail /usr/bin/javac -version
