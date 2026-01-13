"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, FileText, BookOpen, Brain, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo/Brand */}
        <Link href="/" className={styles.brand} onClick={closeMobileMenu}>
          <div className={styles.logo}>
            <Heart className={styles.logoIcon} size={32} />
            <span className={styles.logoText}>
              <span className={styles.brandName}>CardioPredict</span>
              <span className={styles.brandTagline}>AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              isActive("/") ? styles.active : ""
            }`}
          >
            <Home className={styles.linkIcon} size={20} />
            Dashboard
          </Link>
          <Link
            href="/form"
            className={`${styles.navLink} ${
              isActive("/form") ? styles.active : ""
            }`}
          >
            <FileText className={styles.linkIcon} size={20} />
            Assessment
          </Link>
          <Link
            href="/models"
            className={`${styles.navLink} ${
              isActive("/models") ? styles.active : ""
            }`}
          >
            <Brain className={styles.linkIcon} size={20} />
            Model Info
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${
              isActive("/about") ? styles.active : ""
            }`}
          >
            <BookOpen className={styles.linkIcon} size={20} />
            About
          </Link>
        </div>

        {/* CTA Button */}
        <div className={styles.navActions}>
          <Link href="/form">
            <button className={styles.ctaButton}>
              Start Assessment
              <span className={styles.arrowIcon}>→</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuContent}>
          <Link
            href="/"
            className={`${styles.mobileNavLink} ${
              isActive("/") ? styles.activeMobile : ""
            }`}
            onClick={closeMobileMenu}
          >
            <Home className={styles.linkIcon} size={20} />
            Dashboard
          </Link>
          <Link
            href="/form"
            className={`${styles.mobileNavLink} ${
              isActive("/form") ? styles.activeMobile : ""
            }`}
            onClick={closeMobileMenu}
          >
            <FileText className={styles.linkIcon} size={20} />
            Assessment
          </Link>
          <Link
            href="/models"
            className={`${styles.mobileNavLink} ${
              isActive("/models") ? styles.activeMobile : ""
            }`}
            onClick={closeMobileMenu}
          >
            <Brain className={styles.linkIcon} size={20} />
            Models
          </Link>
          <Link
            href="/about"
            className={`${styles.mobileNavLink} ${
              isActive("/about") ? styles.activeMobile : ""
            }`}
            onClick={closeMobileMenu}
          >
            <BookOpen className={styles.linkIcon} size={20} />
            About
          </Link>
          <div className={styles.mobileCTA}>
            <Link href="/form" onClick={closeMobileMenu}>
              <button className={styles.ctaButton}>
                Start Assessment
                <span className={styles.arrowIcon}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
}
